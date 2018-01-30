import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { assoc, compose, curry, juxt, lens, prop, set, view, Lens } from 'ramda';

import { TextField, ITextFieldProps, ITextFieldState } from './components/TextField';
import { DropdownField, IDropdownFieldOption } from './components/DropdownField';
import { MultilineTextField } from './components/MultilineTextField';

import { ITask } from './types/ITask';
import './App.css';

export interface IAppProps { }
export interface IAppState {
    task: ITask;
    statusOptions: IDropdownFieldOption[];
}

/**
 * Curried function that creates the JSX.Element from the component and props parameters
 */
const bindComponentToProps = curry(
    (
        component: React.ComponentClass,
        props: any
    ) => {
        return React.createElement(component, props);
    }
);

/**
 * Curried function to create an object that will eventually be passed to the component
 */
const createPropForComponent = curry(
    (
        label: string,
        propLens: Lens,
        onChange: (lens: Lens) => (value: string) => void,
        data: ITask
    ) => {
        return compose(
            assoc('value', view(propLens)(data)),
            assoc('label', label),
            assoc('onChange', onChange(propLens))
        )({});
    }
);

/**
 * Curried function that adds an 'options' property to the props object
 */
const addOptionsToProp = curry(
    (
        options: IDropdownFieldOption[],
        props: any
    ) => {
        return assoc('options', options)(props);
    }
);

/**
 * App component
 */
export class App extends React.Component<IAppProps, IAppState> {

    private _components = [];

    private _titleLens = lens(prop('title'), assoc('title'));
    private _descriptionLens = lens(prop('description'), assoc('description'));
    private _statusLens = lens(prop('status'), assoc('status'));

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            task: {
                id: 1,
                title: '',
                description: '',
                status: '1'
            } as ITask,
            statusOptions: [
                { key: '1', text: 'Not Started' },
                { key: '2', text: 'In Progress' },
                { key: '3', text: 'Delayed' },
                { key: '4', text: 'Complete' }
            ]
        };

        this._onChanged = this._onChanged.bind(this);
    }

    public componentWillMount() {
        this._buildComponents();
    }

    private _onChanged = curry((lensProp: Lens, value: string) => {
        this.setState({
            task: set(lensProp, value)(this.state.task)
        });
    });

    private _buildComponents() {

        this._components = [
            compose(
                bindComponentToProps(TextField),
                createPropForComponent('Title', this._titleLens, this._onChanged)
            ),
            compose(
                bindComponentToProps(MultilineTextField),
                createPropForComponent('Description', this._descriptionLens, this._onChanged)
            ),
            compose(
                bindComponentToProps(DropdownField),
                addOptionsToProp(this.state.statusOptions),
                createPropForComponent('Status', this._statusLens, this._onChanged)
            )
        ];
    }

    public render() {
        return (
            <div className='container'>
                <div className='header'>Task Form</div>
                {juxt(this._components)(this.state.task)}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-host'));