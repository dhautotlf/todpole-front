import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import MultiSelectModal from '../components/MultiSelectModal';
import Loading from '../components/Loading';
import { getMaterials } from '../hooks';
import { omit, isNil } from 'lodash';

function MaterialsModal({ route }) {
  const { isLoading, data } = getMaterials();
  const [selectedOptions, setSelectedOptions] = useState(
    route.params.selectedOptions || {},
  );

  if (isLoading || !data) return <Loading />;

  const updateSelections = (option, selected) => {
    const newSelection = selected
      ? {
          ...selectedOptions,
          [option.id]: { ...option, selected },
        }
      : omit(selectedOptions, option.id);

    setSelectedOptions(newSelection);
    route.params.onChangeMaterials(newSelection);
  };

  return (
    <MultiSelectModal
      options={data.map((mat) => ({
        ...mat,
        selected: !isNil(selectedOptions[mat.id]),
      }))}
      onSelectedOptionChanged={updateSelections}
    />
  );
}

MaterialsModal.propTypes = {
  route: PropTypes.any,
  options: PropTypes.array,
  modalVisible: PropTypes.bool,
};

MaterialsModal.defaultProps = {};

export default MaterialsModal;
