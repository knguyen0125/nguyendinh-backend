import React, { useEffect, useState } from "react";
import { useStrapi, prefixFileUrlWithBackendUrl } from "strapi-helper-plugin";
import PropTypes from "prop-types";

const MediaLib = ({ isOpen, onChange, onToggle }) => {
  const {
    strapi: {
      componentApi: { getComponent },
      fieldApi,
    },
  } = useStrapi();
  const [data, setData] = useState(null);
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsDisplayed(true);
    }
  }, [isOpen]);

  const Component = getComponent("media-library").Component;

  const handleInputChange = (data) => {
    if (data) {
      setData({ ...data, url: prefixFileUrlWithBackendUrl(data.url) });
    }
  };

  const handleClosed = () => {
    if (data) {
      onChange(data);
    }

    setData(null);
    setIsDisplayed(false);
  };

  if (Component && isDisplayed) {
    return (
      <Component
        allowedTypes={["images", "videos", "files"]}
        isOpen={isOpen}
        multiple={false}
        onClosed={handleClosed}
        onInputMediaChange={handleInputChange}
        onToggle={onToggle}
      />
    );
  }

  return null;
};

MediaLib.defaultProps = {
  isOpen: false,
  onChange: () => {},
  onToggle: () => {},
};

MediaLib.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
};

export default MediaLib;
