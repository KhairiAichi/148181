import React from 'react';
import OriginalDocPage from '@theme-original/DocPage';
import ProtectedDoc from '../../components/ProtectedDoc';

export default function DocPage(props) {
  const roles = props.content.metadata.roles || ['admin','qrmc','employe'];
  return (
    <ProtectedDoc roles={roles}>
      <OriginalDocPage {...props} />
    </ProtectedDoc>
  );
}
