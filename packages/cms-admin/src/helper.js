const innerHTML = html => {
  return {
    dangerouslySetInnerHTML: {
      __html: html,
    },
  };
};

const helper = {
  innerHTML
}

export { innerHTML, helper, helper as default }