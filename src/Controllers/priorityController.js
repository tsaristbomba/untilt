const colors = ["#C45252", "#C4AB52", "#52C47A"];

const handlePriority = (priority) => {
  const level = ["High", "Medium", "Low"];

  return {
    level: level[priority - 1],
    color: colors[priority - 1],
  };
};

export default handlePriority;
