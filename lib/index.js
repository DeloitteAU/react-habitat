"use strict";
/// <reference path='../typings/main.d.ts'/>
var Bootstrapper_1 = require('./Bootstrapper');
var Container_1 = require('./Container');
var createBootstrapper_1 = require('./classic/createBootstrapper');
var ReactHabitat = {
    // Modern
    Bootstrapper: Bootstrapper_1.Bootstrapper,
    Container: Container_1.Container,
    // Classic
    createBoostrapper: createBootstrapper_1.createBootstrapper
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReactHabitat;
