var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var Template_1 = __importDefault(require("./components/Template"));
react_dom_1.default.render(react_1.default.createElement(Template_1.default, null), document.getElementById("root"));
