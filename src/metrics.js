export const analyticsData = [];
export const collectAnalytics = (name, data) => {
  analyticsData.push({ [name]: data });
};
