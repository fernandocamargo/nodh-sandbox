export default `
  form {
    margin: 1rem;
  }

  styled-counter {
    outline: dotted 3px red;

    &::part(container) {
      background-color: orange;
    }

    &::part(skin) {
      background-color: #fff;
      opacity: 0.75;
    }
  }
`
