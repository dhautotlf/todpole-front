import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMaterials, fetchAllMaterials } from '../reducers/materials';

export default function () {
  const dispatch = useDispatch();
  const materials = useSelector(getMaterials);
  useEffect(() => {
    if (!materials.isLoading && !materials.data) dispatch(fetchAllMaterials());
  });
  return materials;
}
