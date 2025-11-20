<template>
  <div class="container my-4">
    <h2>{{ isEdit ? "Редагувати" : "Створити" }} команду</h2>

    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Назва</label>
        <input
            type="text"
            v-model="form.name"
            class="form-control"
            required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Проєкт ID</label>
        <input
            type="number"
            v-model.number="form.project_id"
            class="form-control"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Teamlead ID</label>
        <input
            type="number"
            v-model.number="form.teamlead_id"
            class="form-control"
        />
      </div>

      <button type="submit" class="btn btn-success">
        {{ isEdit ? "Зберегти" : "Створити" }}
      </button>
      <router-link to="/teams" class="btn btn-secondary ms-2">Назад</router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { createTeam, updateTeam, retrieveTeam } from "../api/teams";
import { useRoute, useRouter } from "vue-router";
import type { TeamCreate, TeamUpdate, TeamDetailResponse } from "../api/types";

const route = useRoute();
const router = useRouter();

const isEdit = !!route.params.id;

const form = ref<TeamCreate | TeamUpdate>({ name: "" } as TeamCreate);

onMounted(async () => {
  if (isEdit && route.params.id) {
    const data: TeamDetailResponse = await retrieveTeam(Number(route.params.id));
    form.value = {
      name: data.name,
      project_id: data.project?.id ?? null,
      teamlead_id: data.teamlead?.id ?? null,
    };
  }
});

async function submit() {
  try {
    if (isEdit && route.params.id) {
      await updateTeam(Number(route.params.id), form.value as TeamUpdate);
    } else {
      await createTeam(form.value as TeamCreate);
    }
    await router.push("/teams");
  } catch (e) {
    console.error(e);
    alert("Помилка при збереженні");
  }
}
</script>
