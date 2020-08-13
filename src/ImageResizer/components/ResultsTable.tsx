/** @jsx jsx  */

import { jsx } from '@emotion/core';

import { getReadableSize } from '../utilities/get-readable-size';
import { useTheme } from 'Theme/use-theme';

import type { ResultsRow } from '../types';

type ResultsTableProps = {
	results: ResultsRow[];
};

export const ResultsTable = ({ results }: ResultsTableProps) => {
	const theme = useTheme();

	return (
		<div
			css={{
				padding: theme.space[3]
			}}
		>
			<table
				css={{
					maxWidth: 720
				}}
			>
				<caption
					css={{
						fontSize: theme.fontSizes[3],
						fontWeight: theme.fontWeights.semibold,
						marginBottom: theme.space[2]
					}}
				>
					Results
				</caption>
				<thead>
					<tr>
						<th>File</th>
						<th css={{ textAlign: 'right' }}>Width</th>
						<th css={{ textAlign: 'right' }}>Height</th>
						<th css={{ textAlign: 'right' }}>Size</th>
					</tr>
				</thead>
				<tbody>
					{results.map(({ name, width, height, size }) => (
						<tr key={`results-table-row-${name.toLowerCase().replace(' ', '-')}-key`}>
							<td>{name}</td>
							<td css={{ textAlign: 'right' }}>{width} px</td>
							<td css={{ textAlign: 'right' }}>{height} px</td>
							<td css={{ textAlign: 'right' }}>{getReadableSize(size)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

ResultsTable.displayName = 'ResultsTable';
