function someFunction() {
  let value = 'block';

  let styles = css`
    .test {
      display: ${value + func()};
      -webkit-transition: all ${transitionTime} ease;
      transition: all ${transitionTime} ease;
      color: red;
      -webkit-box-shadow: 1px ${val + 20 + 'px'} 12px;
              box-shadow: 1px ${val + 20 + 'px'} 12px;
    }
  `;

  return styles;
}

let styles = css`
  .test {
    display: ${value + func()};
    visibility: hidden;
    color: ${color};

    &--test {
      color: white;
    }
  }
`;

let anotherStyles = anotherCss`
  .button:hover {
    display: inline-block;
    color: #101010;
    background-color: ${'white'};
    transition: color ${transitionTime} ease;
  }
`;
