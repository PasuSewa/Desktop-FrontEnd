import { FC, useState, useEffect } from "react"

/************************************************************************************ mui related */
import { Container, Grid, Typography, Button } from "@material-ui/core"

import useStyles from "./styles"

/************************************************************************************ redux related */
import { showError } from "../../redux/actions/errorHandlingActions"
import { useSelector, useDispatch } from "react-redux"
import {
	clearCredential,
	initializeCredential,
	setDecryptedCredential,
} from "../../redux/actions/credentialActions"
import { RootState } from "../../redux/store"
import { toggleLoading, setErrorLoading } from "../../redux/actions/loadingActions"

import { translate } from "../../lang"

/************************************************************************************ misc */
import { findCredential, getCredentials, getUser, putCredential } from "../../misc/indexedDB"
import { maxSlots } from "../../misc/staticData"
import { ApiCallI, CredentialT } from "../../misc/types"
import { callApi } from "../../misc/ajaxManager"

/************************************************************************************ components */
import Snackbar from "../../components/Snackbar"
import ShowCredential from "../../components/Sections/ShowCredential"

const ViewCredential: FC = (props: any) => {
	const dispatch = useDispatch()

	const { token } = useSelector((state: RootState) => state.token)
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const [error, setError] = useState(false)

	const [snackbarMessage, setSnackbarMessage] = useState("")

	const [id, setId] = useState(0)

	useEffect(() => {
		// since the url param is a string, we must convert it into a number
		setId(Number(props.match.params.credentialId))

		if (id !== 0) {
			obtainCredential(id)

			dispatch(clearCredential())
		}
	}, [id])

	const obtainCredential = async (id: number) => {
		const data = await findCredential(id)

		if (data === undefined) {
			setError(true)

			setSnackbarMessage(translate("error_messages", lng, 0))

			return
		}
		dispatch(initializeCredential(data))
	}

	const getFromApi = async (decrypted: boolean, agent?: string) => {
		const isAllowedToSee = await checkUser()

		if (!isAllowedToSee) return false

		if (!token) return

		setError(false)

		dispatch(toggleLoading(true))

		const request: ApiCallI = {
			lng,
			token,
			endpoint: "/credential/find/" + id,
			method: "GET",
		}

		return callApi(request).then((response) => {
			if (response.status !== 200) {
				dispatch(setErrorLoading(response.message))

				return false
			}

			dispatch(toggleLoading(false))

			updateCredential(response.data.credential)

			if (decrypted) {
				dispatch(setDecryptedCredential(response.data.credential))
			} else {
				dispatch(initializeCredential(response.data.credential))
			}
			return true
		})
	}

	const checkUser = async () => {
		const user = await getUser()

		const credentials = await getCredentials()

		if (user === undefined || credentials === undefined) {
			// get the user's data from api

			//this false is here just until I implement the api
			return false
		}

		if (user.role === "free" && credentials.length + user.slots_available > maxSlots.free) {
			// the user can't see their credential
			return false
		}

		if (
			user.role === "semi-premium" &&
			credentials.length + user.slots_available > maxSlots.semi_premium
		) {
			// the user also cant se the credential
			return false
		}

		return true
	}

	const updateCredential = async (c: CredentialT) => {
		const data = await putCredential(c)

		if (data === undefined) {
			fatalError()
		}
	}

	const fatalError = () => {
		setError(true)

		setSnackbarMessage(translate("error_messages", lng, 2))

		dispatch(showError(translate("error_messages", lng, 0)))
	}

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container justify={error ? "space-around" : "space-between"} spacing={4}>
				{error ? (
					<>
						<Grid item xs={12} className={classes.error}>
							<Typography variant="subtitle1" gutterBottom paragraph>
								{translate("error_messages", lng, 1)}
							</Typography>
							<Button
								variant="contained"
								className={classes.errorBtn}
								disableElevation
								size="large"
								onClick={() => getFromApi(false)}
							>
								{translate("retry", lng)}
							</Button>
						</Grid>
						<Snackbar open={error} message={snackbarMessage} />
					</>
				) : (
					<ShowCredential getDecryptedCredential={getFromApi} />
				)}
			</Grid>
		</Container>
	)
}

export default ViewCredential
