module.exports = {
  prompt: [
    {
      type: 'confirm',
      name: 'router',
      message: 'Use react router?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'cssm',
      message: 'Use react css moudules?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'redux',
      message: 'Use redux?',
      default: true,
    },
  ],
  completeMessage: 'To get started:\n\n cd <%=destPath%>\n npm start\n\n',
  filter: {
    'src/model/*': 'redux',
    'src/store.js.ejs': 'redux|router',
  },
  ignore: [
    'src/_part/*',
  ]
};
