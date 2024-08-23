const devLog = (title: string, ...inputs: any) => {
  if (
    process.env.NEXT_PUBLIC_NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_NODE_ENV === 'local'
  ) {
    console.info(`[${title}]`, ...inputs);
  }
};

export default devLog;