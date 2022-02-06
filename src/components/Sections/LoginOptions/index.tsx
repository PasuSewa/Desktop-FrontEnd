import { FC, useEffect, useState } from "react"

import { Button, Grid } from "@material-ui/core"
import useStyles from "./styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { translate } from "../../../lang"

import en from "../../../lang/en.json"

import TwoFactorCode from "./TwoFactorCode"
import EmailCode from "./EmailCode"
import SecurityCode from "./SecurityCode"

import { ApiResponseLoginT, UserT } from "../../../misc/types"

import { getUser } from "../../../misc/indexedDB"

const LoginOptions: FC<Props> = ({ onAuthSuccess, isRobot, testing, endpointAlt }) => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { token } = useSelector((state: RootState) => state.token)

	const classes = useStyles()

	const [activeStep, setActiveStep] = useState(1)
	const [activeOption, setActiveOption] = useState(0)
	const [user, setUser] = useState<undefined | UserT>(undefined)

	useEffect(() => {
		if (token) {
			obtainFromDB()
		}
	}, [])

	const obtainFromDB = async () => {
		let data: any = await getUser()

		if (data !== undefined) {
			setUser(data)
		}
	}

	const handleNext = (option: number) => {
		setActiveStep(activeStep + 1)

		setActiveOption(option)
	}

	const handleBack = () => {
		setActiveStep(activeStep - 1)
	}

	const endpoint = endpointAlt ? "/verify-info" : "/login"

	const showOptions = (option: number) => {
		switch (option) {
			case 0:
				return (
					<TwoFactorCode
						isRobot={isRobot}
						testing={testing}
						endpoint={endpoint}
						onAuthSuccess={onAuthSuccess}
						user={user}
					/>
				)
			case 1:
				return (
					<EmailCode
						onAuthSuccess={onAuthSuccess}
						isRecovery={false}
						isRobot={isRobot}
						testing={testing}
						endpoint={endpoint}
						user={user}
					/>
				)
			case 2:
				return (
					<EmailCode
						onAuthSuccess={onAuthSuccess}
						isRecovery={true}
						isRobot={isRobot}
						testing={testing}
						endpoint={endpoint}
						user={user}
					/>
				)
			case 3:
				return (
					<SecurityCode
						isRobot={isRobot}
						testing={testing}
						endpoint={endpoint}
						onAuthSuccess={onAuthSuccess}
						user={user}
					/>
				)

			default:
				return (
					<TwoFactorCode
						isRobot={isRobot}
						testing={testing}
						endpoint={endpoint}
						onAuthSuccess={onAuthSuccess}
						user={user}
					/>
				)
		}
	}

	return (
		<Grid container justify="center" spacing={2} className={classes.container}>
			{activeStep === 1 &&
				en.login_options.map((option, index) => (
					<Grid item xs={12} key={index} className={classes.grid}>
						<Button
							variant="contained"
							color="secondary"
							disableElevation
							data-testid={"test_login_option_" + index}
							className={classes.btn}
							onClick={() => handleNext(index)}
							disabled={isRobot}
						>
							{translate("login_options", lng, index)}
						</Button>
					</Grid>
				))}

			{activeStep === 2 && (
				<>
					<Grid item xs={12} className={classes.grid}>
						{showOptions(activeOption)}
					</Grid>
					<Grid item xs={12} className={classes.goBack}>
						<Button color="primary" size="large" onClick={handleBack}>
							{translate("go_back", lng)}
						</Button>
					</Grid>
				</>
			)}
		</Grid>
	)
}

type Props = {
	onAuthSuccess: (res: ApiResponseLoginT) => void
	isRobot: boolean
	endpointAlt?: boolean
	testing?: boolean
}

export default LoginOptions
