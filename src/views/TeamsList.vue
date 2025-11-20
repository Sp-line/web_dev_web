<template>
  <div class="container my-4">
    <h1>Команди</h1>
    <router-link to="/teams/create" class="btn btn-primary mb-3">Створити команду</router-link>

    <div v-if="loading" class="text-center">Завантаження...</div>

    <ul v-else class="list-group">
      <li v-for="team in teams" :key="team.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <router-link :to="`/teams/${team.id}`">
            {{ team.name }} — {{ team.project?.name ?? "Без проєкту" }}
          </router-link>
          <small v-if="team.teamlead"> (Керівник: {{ team.teamlead.first_name }})</small>
        </div>
        <div>
          <router-link :to="`/teams/${team.id}/edit`" class="btn btn-sm btn-warning me-2">Редагувати</router-link>
          <button @click="remove(team.id)" class="btn btn-sm btn-danger">Видалити</button>
        </div>
      </li>
    </ul>

    <div class="mt-3">Всього: {{ total }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { listTeams, deleteTeam } from "../api/teams";
import type { TeamResponse } from "../api/types";

const teams = ref<TeamResponse[]>([]);
const total = ref(0);
const loading = ref(false);

async function load() {
  loading.value = true;
  try {
    const data = await listTeams();
    teams.value = data.teams;
    total.value = data.total;
  } catch (e) {
    console.error(e);
    alert("Помилка при завантаженні команд");
  } finally {
    loading.value = false;
  }
}

async function remove(id: number) {
  if (!confirm("Впевнені?")) return;
  try {
    await deleteTeam(id);
    teams.value = teams.value.filter(t => t.id !== id);
    total.value = Math.max(0, total.value - 1);
  } catch (e) {
    console.error(e);
    alert("Не вдалося видалити");
  }
}

onMounted(load);
</script>
