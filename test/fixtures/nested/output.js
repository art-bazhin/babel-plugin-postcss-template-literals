function someFunction() {
  let value = 'block';

  let styles = css`
    .test {
      display: ${value + func()};
      transition: all ${transitionTime} ease;
      color: red;
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
    }
      
      .test:hover {
        background: green;
      }
      
      .test--test {
        color: white;
      }
      
      @media (min-width: ${123}px) {
        .test--another-test {
          background: none;
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
