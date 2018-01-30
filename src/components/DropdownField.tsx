import * as React from 'react';

export interface IDropdownFieldOption {
    key: string;
    text: string;
}

export interface IDropdownFieldProps {
    label: string;
    selectedKey: string | number;
    options: IDropdownFieldOption[];
    onChange: (value: string) => void;
}

export interface IDropdownFieldState { }

export class DropdownField extends React.PureComponent<IDropdownFieldProps, IDropdownFieldState> {

    constructor(props: IDropdownFieldProps) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    private _onChange(ev: React.ChangeEvent<HTMLSelectElement>): void {
        this.props.onChange(ev.currentTarget.value);
    }

    public render() {
        return (
            <div className='field-group'>
                <div className='field-label'>
                    <label>{this.props.label}</label>
                </div>
                <select value={this.props.selectedKey} onChange={this._onChange} >
                    {this.props.options.map(o => <option key={o.key} value={o.key}>{o.text}</option>)}
                </select>
            </div>
        );
    }
}