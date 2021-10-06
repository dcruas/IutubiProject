import React, { Component, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import "./NavMenu.css";
import logo from "../img/logo-youtube.png";

function NavMenu() {
  const [collapsed, setCollapse] = useState(true);

  function toggleNavbar() {
    this.setCollapse({
      collapsed: !collapsed,
    });
  }

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            {" "}
            <img src={logo} width="64px" height="64px" /> Iutubi
            <font color="red"> Project </font>
          </NavbarBrand>

          <NavbarToggler onClick={() => toggleNavbar()} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink
                  tag={Link}
                  activeClassName="menuzao-ativo"
                  className="menuzao"
                  to="/"
                  exact
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  activeClassName="menuzao-ativo"
                  className="menuzao"
                  to="/MyContent"
                >
                  My Contents
                </NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavMenu;
