<template>
  <div class="container my-4" v-if="team">
    <h2>Команда: {{ team.name }}</h2>
    <p><strong>Проєкт:</strong> {{ team.project?.name ?? "Без проєкту" }}</p>
    <p><strong>Керівник:</strong> {{ team.teamlead?.first_name ?? "Немає" }}</p>

    <h4>Члени команди</h4>
    <ul class="list-group">
      <li v-for="member in team.members" :key="member.id" class="list-group-item">
        {{ member.employee.first_name }} {{ member.employee.last_name }} — {{ member.employee.email }}
      </li>
    </ul>

    <router-link to="/teams" class="btn btn-secondary mt-3">Назад</router-link>
    <router-link :to="`/teams/${team.id}/edit`" class="btn btn-warning mt-3 ms-2">Редагувати</router-link>
  </div>

  <div v-else class="text-center my-4">Завантаження...</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { retrieveTeam } from "../api/teams";
import type { TeamDetailResponse } from "../api/types";
import { useRoute } from "vue-router";

const route = useRoute();
const team = ref<TeamDetailResponse | null>(null);

onMounted(async () => {
  if (route.params.id) {
    team.value = await retrieveTeam(Number(route.params.id));
  }
});
</script>
