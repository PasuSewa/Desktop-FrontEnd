import React from "react"
import {
	Box,
	Grid,
	TextField,
	Button,
	InputAdornment,
	OutlinedInput,
	InputLabel,
	FormControl,
} from "@material-ui/core"

const EmailCode = ({ testing }: { testing?: boolean }) => {
	return (
		<Box component="div" style={{ marginTop: 15 }}>
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12} sm={6}>
					<Grid container justify="center" spacing={3}>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
								<OutlinedInput
									label="Email"
									endAdornment={
										<InputAdornment position="end">
											<Button
												variant="contained"
												color="primary"
												size="small"
												disableElevation
											>
												Send Code
											</Button>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel htmlFor="outlined-adornment-password">
									VerificationCode
								</InputLabel>
								<OutlinedInput label="VerificationCode" />
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" color="primary" fullWidth disableElevation>
								Primary
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}

export default EmailCode
