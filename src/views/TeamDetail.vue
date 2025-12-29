<template>
  <div class="container my-4" v-if="team">
    <h2>{{ $t('teams.detail_title', { name: team.name }) }}</h2>
    <p><strong>{{ $t('teams.project_label') }}</strong> {{ team.project?.name ?? $t('teams.no_project') }}</p>
    <p><strong>{{ $t('teams.teamlead_label') }}</strong> {{ team.teamlead?.first_name ?? $t('teams.no_teamlead') }}</p>

    <h4>{{ $t('teams.members_title') }}</h4>
    <ul class="list-group">
      <li v-for="member in team.members" :key="member.id" class="list-group-item">
        {{ member.employee.first_name }} {{ member.employee.last_name }} — {{ member.employee.email }}
      </li>
    </ul>

    <router-link to="/teams" class="btn btn-secondary mt-3">{{ $t('common.back') }}</router-link>
    <router-link :to="`/teams/${team.id}/edit`" class="btn btn-warning mt-3 ms-2">{{ $t('common.edit') }}</router-link>
  </div>

  <div v-else class="text-center my-4">{{ $t('common.loading') }}</div>
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