function someFunction() {
  let value = 'block';

  let styles = postcss`
    .test {
      display: ${value + func()};
      transition: all ${transitionTime} ease; 
    }
  `;

  return styles;
}

let styles = postcss`
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
  }
`;
