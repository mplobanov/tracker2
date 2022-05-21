import React from "react";
import "../../../index.css";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AvatarChoice } from "./AvatarChoice";
import { Formik } from "formik";

import housine from "../../../assets/housine.jpg";
import jacob from "../../../assets/jacob.jpg";
import jake from "../../../assets/jake.jpg";
import nanita from "../../../assets/nanita.jpg";
import isaac from "../../../assets/isaac.jpg";

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "AvatarChoice",
	component: AvatarChoice,
} as ComponentMeta<typeof AvatarChoice>;

const Template: ComponentStory<typeof AvatarChoice> = (args) => (
	<div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
		<Formik
			initialValues={{
				title: ["2", "3"],
			}}
			onSubmit={(values) => console.log(values)}
		>
			{(props) => <AvatarChoice {...args} />}
		</Formik>
	</div>
);

export const MultipleChoice = Template.bind({});
MultipleChoice.args = {
	name: "title",
	choices: [
		{ name: "Хусин", img: housine },
		{ name: "Айзек", img: isaac },
		{ name: "Джейк", img: jake },
		{ name: "Якоб", img: jacob },
		{ name: "Нанита", img: nanita },
	].map((entry, i) => {
		return {
			uid: i.toString(),
			user: {
				name: entry.name,
				photoUrl: entry.img,
			},
		};
	}),
};

export const SingleChoice = Template.bind({});
SingleChoice.args = {
	name: "title",
	choices: [
		{ name: "Хусин", img: housine },
		{ name: "Айзек", img: isaac },
		{ name: "Джейк", img: jake },
		{ name: "Якоб", img: jacob },
		{ name: "Нанита", img: nanita },
	].map((entry, i) => {
		return {
			uid: i.toString(),
			user: {
				name: entry.name,
				photoUrl: entry.img,
			},
		};
	}),
	singleChoice: true,
};
