import * as React from 'react';

export interface IMultilineTextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export interface IMultilineTextFieldState { }

export class MultilineTextField extends React.PureComponent<IMultilineTextFieldProps, IMultilineTextFieldState> {
    constructor(props: IMultilineTextFieldProps) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    private _onChange(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.props.onChange(ev.currentTarget.value);
    }

    public render() {
        return (
            <div className='field-group'>
                <div className='field-label'>
                    <label>{this.props.label}</label>
                </div>
                <textarea rows={6} value={this.props.value} onChange={this._onChange} />
            </div>
        );
    }
}