/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx, css, keyframes } from '@emotion/core';
import React, { useState } from 'react'; // eslint-disable-line
import useFetch from 'use-http';
import Truncate from 'react-truncate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';

import FAB from './FloatingActionButton';
import Message from './Message';
import EditableListItem from './EditableListItem';
import QuantityPicker from './QuantityPicker';

import { listStyle, listItemStyle, itemNameStyle } from '../styles/list';
import { idToName } from '../utils/categories';

const listItemContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  text-align: left;
`;

const categoryStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1rem;
  min-width: 8.5rem;
  max-width: 25%;
`;

const iconStyle = css`
  color: var(--blue);
  margin-right: 0.5rem;
`;

const pickerStyle = css`
  min-width: 8rem;
  width: 10%;
  margin-left: 1rem;
`;

const borderFlicker = keyframes`
  from {
    border-color: var(--dark-blue);
  }

  to {
    border-color: var(--light-blue);
  }
`;

const chooseItemStyle = css`
  cursor: pointer;
  animation: ${borderFlicker} 0.7s ease-out infinite alternate;
`;

function NormalItem({ id, name, location, category, quantity, updateFn }) {
  let locationIcon;
  if (location === 'fridge') locationIcon = faTint;
  else if (location === 'freezer') locationIcon = faSnowflake;

  return (
    <>
      <div css={itemNameStyle}>
        <Truncate lines={2}>{name}</Truncate>
      </div>
      <div css={categoryStyle}>
        {locationIcon && <FontAwesomeIcon icon={locationIcon} css={iconStyle} />}
        <Truncate>{idToName(category)}</Truncate>
      </div>
      <div css={pickerStyle}>
        <QuantityPicker initial={quantity} onChange={(newVal) => updateFn(id, { quantity: newVal })} />
      </div>
    </>
  );
}

export function ItemListChildren({ items, message, refreshFn }) {
  const [choosingEdit, setChoosingEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  function edit(id) {
    console.log(`edit ${id}`);
    setChoosingEdit(false);
    setEditingId(id);
  }

  const { post: postItem } = useFetch('/items', { cachePolicy: 'no-cache' });
  const update = (id) => async (updates) => {
    await postItem(`/${id}`, updates);
    refreshFn();
    setEditingId(null);
  };

  function fabClick() {
    setChoosingEdit((old) => !old);
  }

  return (
    <>
      {!editingId && (
        <FAB
          icon={choosingEdit ? faTimes : faPen}
          customCss={choosingEdit && { fontSize: '2.4rem' }}
          onClick={fabClick}
        />
      )}
      {message}
      {choosingEdit && (
        <Message customCss={{ marginTop: '1rem', marginBottom: '2rem' }} message="Choose an item to edit:" />
      )}
      {items.map((item) => {
        const { id, duration } = item;
        let status = 'normal';
        if (duration && duration.asWeeks() >= 2) status = 'red';
        else if (duration && duration.asWeeks() >= 1) status = 'orange';

        return editingId === id ? (
          <EditableListItem initial={item} submitFn={update(id)} />
        ) : (
          <li
            key={id}
            css={[listItemStyle(status), listItemContainer, choosingEdit && chooseItemStyle]}
            onClick={() => choosingEdit && edit(id)}
          >
            <NormalItem {...item} />
          </li>
        );
      })}
    </>
  );
}

// Expects props: { items, message, refreshFn }
function ItemList(props) {
  return (
    <ul css={listStyle}>
      <ItemListChildren {...props} />
    </ul>
  );
}

export default ItemList;
