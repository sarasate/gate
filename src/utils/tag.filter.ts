const REQUESTS = ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS", "HEAD"];

export const groupByTags = (data) => {
  return (
    data.tags?.map((tag) => {
      tag.operations = [];

      Object.entries(data.paths).forEach(([pathKey, path]) => {
        Object.entries(path).forEach(([key, value]) => {
          if (REQUESTS.includes(key.toUpperCase())) {
            if (value?.tags?.includes(tag.name)) {
              tag.operations.push({ ...value, method: key, path: pathKey });
            }
          }
        });
      });
      return tag;
    }) || []
  );
};
