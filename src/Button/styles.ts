import styled from "styled-components";

export const Button = styled.button`
  color: inherit;
  text-transform: uppercase;
  word-wrap: break-word;
  white-space: normal;
  cursor: pointer;
  border: 0;
  border-radius: 0.125rem;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 1rem 2.4rem;
  font-size: 0.94rem;
  width: 100%;

  color: #fff;
  background-color: #4285f4 !important;

  &:hover {
    box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);
    border-color: #0062cc;
  }

  &:active {
    background-color: #0b51c5 !important;
    box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);
  }
`;
