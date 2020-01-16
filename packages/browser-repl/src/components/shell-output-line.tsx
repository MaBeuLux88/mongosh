import React, { Component } from 'react';
import PropTypes from 'prop-types';
import safeJsonStringify from 'safe-json-stringify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ShellOutputEntryValue = any;

export interface ShellOutputEntry {
  type: string;
  value: ShellOutputEntryValue;
}

interface ShellOutputLineProps {
  entry: ShellOutputEntry;
}

export class ShellOutputLine extends Component<ShellOutputLineProps> {
  static propTypes = {
    entry: PropTypes.object.isRequired
  };

  private formatValue(value: ShellOutputEntryValue): string {
    if (value instanceof Error) {
      return value.stack;
    }

    return safeJsonStringify(value, null, 2);
  }

  render(): JSX.Element {
    const formattedValue = this.formatValue(this.props.entry.value);
    const className = `shell-output-line shell-output-line-${this.props.entry.type}`;
    return <pre className={className}>{formattedValue}</pre>;
  }
}
