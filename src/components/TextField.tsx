import * as React from 'react';

export interface ITextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export interface ITextFieldState { }

export class TextField extends React.PureComponent<ITextFieldProps, ITextFieldState> {

    constructor(props: ITextFieldProps) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    private _onChange(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.props.onChange(ev.currentTarget.value);
    }

    public render() {
        return (
            <div className='field-group'>
                <div className='field-label'>
                    <label>{this.props.label}</label>
                </div>
                <input type='text' value={this.props.value} onChange={this._onChange} />
            </div>
        );
    }
}