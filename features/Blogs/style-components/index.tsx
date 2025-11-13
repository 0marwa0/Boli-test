import styled from "styled-components";

const Container = styled.main`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial;
`;

const Header = styled.h1`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 8px;
`;

const Title = styled.div`
  font-weight: 600;
`;

const Body = styled.div`
  color: #444;
  font-size: 0.95rem;
`;

const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background: #0070f3;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonNav = styled.button`
  background: gray;
  color: white;
  border: none;
  margin: 10px 0;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export {
  Button,
  Actions,
  Body,
  Container,
  Header,
  Item,
  List,
  Title,
  ButtonNav,
};
