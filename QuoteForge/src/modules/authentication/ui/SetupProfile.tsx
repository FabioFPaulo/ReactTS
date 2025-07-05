import MyButtonSubmit from "@/components/forms/MyButtonSubmit";
import MyDateField from "@/components/forms/MyDateField";
import MySelectField from "@/components/forms/MySelectField";
import MyTextField from "@/components/forms/MyTextField";
import FirebaseUserRepository from "@/repositories/UserRepository/FirebaseUserRepository";
import MyUserProfile from "@/repositories/UserRepository/models/MyUserProfile";
import { Button, Grid, MenuItem, Stack, Typography } from "@mui/material";
import intl from "intl-tel-input/intlTelInputWithUtils";
import moment, { type Moment } from "moment";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

interface Props {
    onLogout(): void;
    onCreateClick(profile: MyUserProfile): void;
    isLoading: boolean;
}

interface FormValues {
    firstName: string;
    lastName: string;
    birthday: Moment | null;
    phone: string;
    iso: string;
}

export default function SetupProfile(props: Props) {
    const { control, handleSubmit, formState, watch, setValue } =
        useForm<FormValues>({
            defaultValues: {
                firstName: "",
                lastName: "",
                birthday: null,
                phone: "",
                iso: "pt",
            },
        });

    const form = watch();

    const mask = useMemo(() => {
        const placeholder = intl.utils?.getExampleNumber(
            form.iso,
            true,
            intl.utils.numberFormat.INTERNATIONAL
        );

        return placeholder?.replace(/[0-9]/g, "9");
    }, [form.iso]);

    useEffect(() => {
        setValue("phone", "");
    }, [form.iso, setValue]);

    const onSubmit = (data: FormValues) => {
        const user = new FirebaseUserRepository().user!;
        const profile = new MyUserProfile(
            user.uid,
            data.firstName,
            data.lastName,
            data.phone,
            data.birthday!.toDate(),
            data.iso
        );
        props.onCreateClick(profile);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <MyTextField
                        control={control}
                        name="firstName"
                        label="First Name"
                        rules={{
                            required: "First Name is required",
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <MyTextField
                        control={control}
                        name="lastName"
                        label="Last Name"
                        rules={{
                            required: "Last Name is required",
                        }}
                    />
                </Grid>

                <Grid size={12}>
                    <MyDateField
                        control={control}
                        name="birthday"
                        label="Birthday"
                        rules={{
                            required: "Birthday date is required",
                            validate: (value: Moment | null) =>
                                (value &&
                                    value.isBefore(
                                        moment().subtract(18, "year")
                                    )) ||
                                "You should have at least 18 years old",
                        }}
                    />
                </Grid>

                <Grid size={12}>
                    <MySelectField control={control} name="iso" label="Code">
                        {intl.getCountryData().map((country, key) => (
                            <MenuItem value={country.iso2} key={key}>
                                <Stack
                                    flexDirection="row"
                                    alignItems="center"
                                    width="100%"
                                >
                                    <Typography flex={1}>
                                        {country.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        +{country.dialCode}
                                    </Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                    </MySelectField>
                </Grid>

                <Grid size={12}>
                    <MyTextField
                        label="Phone"
                        control={control}
                        name="phone"
                        mask={mask}
                        rules={{
                            required: "Phone is required!",
                            validate: (value, fields) =>
                                intl.utils?.isValidNumber(value, fields.iso) ||
                                "Number phone is not valid",
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <Stack>
                        <MyButtonSubmit
                            label="create profile"
                            isLoading={
                                formState.isSubmitting || props.isLoading
                            }
                        />
                    </Stack>
                </Grid>
                <Grid size={12} textAlign="center">
                    <Stack>
                        <Button
                            disabled={formState.isSubmitting || props.isLoading}
                            onClick={props.onLogout}
                            size="small"
                        >
                            Try another account
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
}
