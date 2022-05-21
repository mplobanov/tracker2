import { useEffect, useState } from "react";
import { DefaultService, User, UserEntry } from "../services/openapi";

export const useUidUser = (uid: string) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (!!uid) {
			const userLocal = sessionStorage.getItem(`userdata_${uid}`);
			if (userLocal !== null) {
				setUser(JSON.parse(userLocal));
			} else {
				DefaultService.getUserUserUidGet(uid).then((res) => {
					sessionStorage.setItem(
						`userdata_${uid}`,
						JSON.stringify(res)
					);
					setUser(res);
				});
			}
		}
	}, [uid]);

	return {
		user,
		loading: user === null,
	};
};

export type UserArray = UserEntry[];

export const useMultipleUidUser = (uids: string[]) => {
	const [users, setUsers] = useState<UserArray>([]);

	useEffect(() => {
		Promise.all<UserEntry>(
			uids.map(async (uid) => {
				const cand = sessionStorage.getItem(`userdata_${uid}`);
				if (cand !== null) {
					return { uid: uid, user: JSON.parse(cand) };
				} else {
					const usr: User = await DefaultService.getUserUserUidGet(
						uid
					);
					sessionStorage.setItem(
						`userdata_${uid}`,
						JSON.stringify(usr)
					);
					return { uid, user: usr };
				}
			})
		).then((res) => {
			setUsers(res);
		});
	}, [uids]);

	return users;
};

export const useUserList = () => {
	const [users, setUsers] = useState<UserArray>([]);

	useEffect(() => {
		DefaultService.getUserListUserlistGet().then((res) => {
			setUsers(res);
		});
	}, []);

	return {
		loading: users === [],
		users,
	};
};
