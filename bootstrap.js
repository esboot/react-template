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
  completeMessage: '\nTo get started:\n\n\tcd <%=destPath%>\n\t<%=cmd%> start\n',
  incompleteMessage: '\nTo get started:\n\n\tcd <%=destPath%>\n\t<%=cmd%> install\n\t<%=cmd%> start\n',
  filter: {
    'src/model/*': 'redux',
    'src/store.js.ejs': 'redux',
  },
  ignore: [
    'src/_part/*',
  ]
};
