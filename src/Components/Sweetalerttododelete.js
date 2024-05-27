import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

function Sweetalerttododelete({ isVisible, toggleVisibility }) {
  useEffect(() => {
    if (isVisible) {
      Swal.fire({
        title: '<h1>Are you sure? </h1><br/>want to Delete?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', '', 'success');
        } else if (result.isDenied) {
          Swal.fire('Changes are not deleted', '', 'info');
        }

        // Hide the alert after user interaction
        toggleVisibility(false);
      });
    }
  }, [isVisible, toggleVisibility]);

  return null;
}

export default Sweetalerttododelete;