<template>
  <div class="container my-4">
    <div class="mb-3">
      <button @click="setLocale('uk')" class="btn btn-sm" :class="{'btn-info': locale === 'uk', 'btn-outline-info': locale !== 'uk'}">UA</button>
      <button @click="setLocale('en')" class="btn btn-sm ms-2" :class="{'btn-info': locale === 'en', 'btn-outline-info': locale !== 'en'}">EN</button>
    </div>

    <h1>{{ $t('teams.title') }}</h1>
    <router-link to="/teams/create" class="btn btn-primary mb-3">{{ $t('teams.create_button') }}</router-link>

    <div v-if="loading" class="text-center">{{ $t('common.loading') }}</div>

    <ul v-else class="list-group">
      <li v-for="team in teams" :key="team.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <router-link :to="`/teams/${team.id}`">
            {{ team.name }} — {{ team.project?.name ?? $t('teams.no_project') }}
          </router-link>
          <small v-if="team.teamlead"> ({{ $t('teams.teamlead_prefix') }} {{ team.teamlead.first_name }})</small>
        </div>
        <div>
          <router-link :to="`/teams/${team.id}/edit`" class="btn btn-sm btn-warning me-2">{{ $t('common.edit') }}</router-link>
          <button @click="remove(team.id)" class="btn btn-sm btn-danger">{{ $t('common.delete') }}</button>
        </div>
      </li>
    </ul>

    <div class="mt-3">{{ $t('teams.total') }} {{ total }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { listTeams, deleteTeam } from "../api/teams";
import type { TeamResponse } from "../api/types";
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const teams = ref<TeamResponse[]>([]);
const total = ref(0);
const loading = ref(false);

function setLocale(newLocale: string) {
  locale.value = newLocale;
}

async function load() {
  loading.value = true;
  try {
    const data = await listTeams();
    teams.value = data.teams;
    total.value = data.total;
  } catch (e) {
    console.error(e);
    alert(t("teams.load_error"));
  } finally {
    loading.value = false;
  }
}

async function remove(id: number) {
  if (!confirm(t("teams.confirm_delete"))) return;
  try {
    await deleteTeam(id);
    teams.value = teams.value.filter(t => t.id !== id);
    total.value = Math.max(0, total.value - 1);
  } catch (e) {
    console.error(e);
    alert(t("teams.delete_error"));
  }
}

onMounted(load);
</script>