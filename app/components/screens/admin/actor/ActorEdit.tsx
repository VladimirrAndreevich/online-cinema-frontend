import { IActorEditInput } from "./actor-edit.interface";
import { useActorEdit } from "./useActorEdit";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import formStyles from "@/ui/form-elements/adminForm.module.scss";
import SlugField from "@/components/ui/form-elements/SlugField/SlugField";

import Button from "@/ui/form-elements/Button";
import Field from "@/ui/form-elements/Field";
import Heading from "@/ui/heading/Heading";

import generateSlug from "@/utils/string/generateSlug";
import Meta from "@/utils/meta/Meta";
import AdminNavigation from "@/components/ui/AdminNavigation/AdminNavigation";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import UploadField from "@/components/ui/form-elements/UploadField/UploadField";

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({
		mode: "onChange",
	});

	const { isLoading, onSubmit } = useActorEdit(setValue);

	return (
		<Meta title="Edit actor">
			<AdminNavigation />
			<Heading title="Edit actor" />
			{isLoading ? (
				<SkeletonLoader count={3} />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
					<div className={formStyles.fields}>
						<Field
							{...register("name", {
								required: "Name is required!",
							})}
							placeholder="Name"
							error={errors.name}
						/>
						<SlugField
							generate={() => setValue("slug", generateSlug(getValues("name")))}
							register={register}
							error={errors.slug}
						/>
						<Controller
							name="photo"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder="Photo"
									error={error}
									folder="actors"
									value={value}
									onChange={onChange}
								/>
							)}
							rules={{
								required: "Photo is required!",
							}}
						/>
					</div>

					<Button>Update</Button>
				</form>
			)}
		</Meta>
	);
};

export default ActorEdit;
