import type { $ZodIssueBase } from 'zod/v4/core'

export function mapZodErrorsToForm(issues: $ZodIssueBase[]) {
	return issues.map(err => {
		const name = err.path && err.path.length > 0 ? err.path.join('.') : 'form'
		return {
			name: name,
			message: err.message
		};
	});
}