import React from 'react';
import PropTypes from 'prop-types';

import Bold from 'quill-icons/lib/icons/bold';
import Italic from 'quill-icons/lib/icons/italic';
import Strike from 'quill-icons/lib/icons/strike';
import Underline from 'quill-icons/lib/icons/underline';
import Code from 'quill-icons/lib/icons/code';
import FloatFull from 'quill-icons/lib/icons/float-full';
import Header2 from 'quill-icons/lib/icons/header-2';
import Header3 from 'quill-icons/lib/icons/header-3';
import Link from 'quill-icons/lib/icons/link';

import Clickable from '../lib/components/Clickable';
import { MARK_TYPES, NODE_TYPES, HOTKEYS } from '../consts';

const { BOLD, CODE, ITALIC, UNDERLINE, STRIKE } = MARK_TYPES;
const { SECTION, H2, H3, LINK } = NODE_TYPES;

const ICONS = {
  [BOLD]: Bold,
  [ITALIC]: Italic,
  [UNDERLINE]: Underline,
  [STRIKE]: Strike,
  [CODE]: Code,
  [H2]: Header2,
  [H3]: Header3,
  [LINK]: Link,
  [SECTION]: FloatFull,
};

const getTitle = name => {
  if (name === SECTION) {
    return 'Add Section (shift+enter)';
  }
  const hotkey = HOTKEYS[name];
  if (hotkey) {
    return `${name} (ctrl+${hotkey})`;
  }
  return name;
};

const ToolbarIcon = ({ name, active, onClick }) => {
  const Icon = ICONS[name];
  if (!Icon) {
    // eslint-disable-next-line no-console
    console.log(`> Unsuported icon "${name}" - skip.`);
    return null;
  }

  const postfix = active ? '-active' : '';
  const iconProps = Object.entries({
    strokeClassName: 'ql-stroke',
    fillClassName: 'ql-fill',
    evenClassName: 'ql-even',
    strokeMitterClassName: 'ql-stroke-mitter',
    thinClassName: 'ql-thin',
  }).reduce((acc, [k, v]) => {
    acc[k] = `${v}${postfix}`;
    return acc;
  }, {});

  return (
    <Clickable onClick={onClick} title={getTitle(name)}>
      <Icon className="toolbar-item" {...iconProps} />
    </Clickable>
  );
};

ToolbarIcon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

ToolbarIcon.defaultProps = {
  active: false,
};

export default ToolbarIcon;
