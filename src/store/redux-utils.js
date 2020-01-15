export const registerAction = (baseType, triggerArgs) => ({
  start: () => ({ type: `${baseType}_START` }),
  success: payload => ({ type: `${baseType}_SUCCESS`, payload }),
  failed: payload => ({ type: `${baseType}_FAILED`, payload }),
  trigger: payload => ({ type: `${baseType}`, payload }),
});

export const setTypes = typesArray =>
  typesArray
    .map(type => {
      let types = {};
      const start = `${type}_START`;
      const success = `${type}_SUCCESS`;
      const failed = `${type}_FAILED`;
      types[type] = type;
      types[start] = start;
      types[success] = success;
      types[failed] = failed;
      return types;
    })
    .reduce((memo, type) => ({ ...memo, ...type }), {});
