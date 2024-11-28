import react from 'react';

const RoleFeatureSelector = ( {features, selectedFeatures, setSelectedFeatures }) => {
    const handleFeatureSelect = (feature) => {
        if(selectedFeatures.include(feature)) {
            setSelectedFeatures(selectedFeatures.filter((f) => f !==features));
        } else{
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    };

    
}