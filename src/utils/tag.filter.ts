const REQUESTS = ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS", "HEAD"];

export const filterByTags = (data, tag: string) => {
  return Object.keys(data.paths).map((pathKey) => {
    const path = data.paths[pathKey];
    const operations = Object.keys(path).reduce((acc, key) => {
      if (REQUESTS.includes(key.toUpperCase())) acc.push(path[key]);
      return acc;
    }, []);
    return operations;
  });
};

export const groupByTags = (data) => {
  return data.tags.map((tag) => {
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
  });
};
