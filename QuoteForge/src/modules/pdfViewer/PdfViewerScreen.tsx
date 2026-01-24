import useBudgetActions from "@/hooks/useBudgetActions";
import usePrivateLayout from "@/hooks/usePrivateLayout";
import useProjectActions from "@/hooks/useProjectActions";
import { v4 as uuidv4 } from "uuid";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import {
  Box,
  Card,
  CardContent,
  filledInputClasses,
  Grid,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import ConstructionIcon from "@mui/icons-material/Construction";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import MyTextField from "@/components/forms/MyTextField";
import MySwitch from "@/components/forms/MySwitch";
import PdfView from "./PdfViewer";
import { type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import DragList from "@/components/dragList/DragList";
import AddIcon from "@mui/icons-material/Add";

type TForm = {
  showEmail: boolean;
  showPhone: boolean;
  title: string;
  to: string;
  budgets: { id: string; content: string }[];
  total: string;
};

export default function PdfViewerScreen() {
  const { user, profile, initPage } = usePrivateLayout();
  const { projectId, budgetId } = useParams();
  const { get } = useBudgetActions(user!.id, projectId!);
  const { get: getProject } = useProjectActions(user!.id);

  const init = useCallback(async () => {
    const budget = await get(budgetId!);
    const project = await getProject(projectId!);

    initPage(budget.name, "Format your file", [
      {
        to: "/",
        Icon: HomeIcon,
        label: "Home",
        active: false,
      },
      {
        to: "/projects",
        Icon: ConstructionIcon,
        label: "My projects",
        active: false,
      },
      {
        to: `/projects/${project.id}`,
        Icon: FolderIcon,
        label: project.name,
        active: false,
      },
      {
        to: `/projects/${project.id}/${budget.id}`,
        Icon: RequestPageIcon,
        label: budget.name,
        active: true,
      },
    ]);
  }, [budgetId, get, getProject, initPage, projectId]);

  const {
    control,
    watch: useFormWatch,
    setValue,
  } = useForm<TForm>({
    defaultValues: {
      showEmail: true,
      showPhone: true,
      title: profile!.firstName + " " + profile!.lastName,
      to: "Mr. John Foo",
      budgets: Array.from({ length: 5 }, (_, k) => k).map((k) => ({
        id: `item-${k}`,
        content: `item ${k}`,
      })),
      total: "0",
    },
  });

  const formItem = useForm<{ name: string }>();

  const watch = useFormWatch();

  useEffect(() => {
    init();
  }, [init]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = watch.budgets.findIndex(
          (item) => item.id === active.id,
        );
        const newIndex = watch.budgets.findIndex((item) => item.id === over.id);

        const newArr = arrayMove(watch.budgets, oldIndex, newIndex);

        setValue("budgets", newArr);
      }
    },
    [setValue, watch.budgets],
  );

  const onSubmitItem = useCallback(
    (data: { name: string }) => {
      setValue("budgets", [
        ...watch.budgets,
        { id: uuidv4(), content: data.name },
      ]);
      formItem.setValue("name", "");
    },
    [formItem, setValue, watch.budgets],
  );

  const removeBudgetItem = useCallback(
    (id: string) => {
      const newArr = watch.budgets.filter((e) => e.id !== id);
      setValue("budgets", newArr);
    },
    [setValue, watch.budgets],
  );

  return (
    <Stack direction="row" height="100%" spacing={5}>
      <Stack spacing={5} flex={1}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Personal data
            </Typography>
            <Grid container rowSpacing={5} columnSpacing={10} pt={3}>
              <Grid size={12}>
                <MyTextField name="title" label="Title" control={control} />
              </Grid>
              <Grid size={6}>
                <MySwitch control={control} name="showEmail" label="Email" />
              </Grid>
              <Grid size={6}>
                <MySwitch control={control} name="showPhone" label="Phone" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Target
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={3} pt={3} mb={6}>
              <Grid size={6}>
                <MyTextField name="to" label="To" control={control} />
              </Grid>
              <Grid size={6}>
                <MyTextField
                  name="total"
                  label="Total"
                  control={control}
                  endAndornment={() => (
                    <InputAdornment
                      position="end"
                      sx={{
                        alignSelf: "flex-end",
                        opacity: 0,
                        pointerEvents: "none",
                        [`.${filledInputClasses.root} &`]: {
                          marginBottom: "7.5px",
                        },
                        [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]:
                          {
                            opacity: 1,
                          },
                      }}
                    >
                      €
                    </InputAdornment>
                  )}
                />
              </Grid>
            </Grid>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Budgets
            </Typography>

            <MyTextField
              name="name"
              label="New Budget"
              control={formItem.control}
              rules={{
                required: true,
              }}
              variant="outlined"
              endAndornment={(disabled) => (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    size="small"
                    disabled={disabled}
                    onClick={formItem.handleSubmit(onSubmitItem)}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              )}
            />

            <DragList
              handleDragEnd={handleDragEnd}
              items={watch.budgets}
              onRemoveItem={(id) => removeBudgetItem(id)}
            />
          </CardContent>
        </Card>
      </Stack>
      <Box flex={1}>
        <PdfView
          email={watch.showEmail ? user!.email : null}
          phone={watch.showPhone ? profile!.phone : null}
          title={watch.title}
          to={watch.to}
          budgets={watch.budgets.map((e) => e.content)}
          total={watch.total}
        />
      </Box>
    </Stack>
  );
}

// Create styles
