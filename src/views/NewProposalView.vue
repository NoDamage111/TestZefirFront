<template>
  <v-container fluid class="pa-1">
    <v-row class="fill-height" style="min-height: calc(100vh - 90px)">
      <!-- Левая часть - параметры поиска -->
      <v-col cols="12" md="5" class="pr-1">
        <v-card class="h-100" elevation="2" style="overflow-y: auto">
          <v-card-title class="text-h6 pa-3">Параметры поиска</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-1">
            <v-form @submit.prevent="searchFans" class="compact-form">
              <!-- Система/Количество -->
              <v-row dense class="mt-0">
                <v-col cols="6" class="py-0 pr-1">
                  <v-text-field
                    v-model="searchParams.system"
                    label="Система"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="py-0 pl-1">
                  <v-text-field
                    v-model.number="searchParams.quantity"
                    label="Количество"
                    type="number"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Тип вентилятора/Серия -->
              <v-row dense class="mt-0">
                <v-col cols="6" class="py-0 pr-1">
                  <v-select
                    v-model="searchParams.fanType"
                    :items="fanTypes"
                    label="Тип вентилятора"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                    @change="updateSeries"
                  ></v-select>
                </v-col>
                <v-col cols="6" class="py-0 pl-1">
                  <v-select
                    v-model="searchParams.series"
                    :items="filteredSeries"
                    label="Серия"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                    :disabled="!searchParams.fanType"
                  ></v-select>
                </v-col>
              </v-row>

              <!-- Расход/Давление -->
              <v-row dense class="mt-0">
                <v-col cols="6" class="py-0 pr-1">
                  <v-text-field
                    v-model.number="searchParams.flowRate"
                    label="Расход, м³/ч"
                    type="number"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="py-0 pl-1">
                  <v-text-field
                    v-model.number="searchParams.pressure"
                    label="Давление, Па"
                    type="number"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Отклонение вверх/Отклонение вниз -->
              <v-row dense class="mt-0">
                <v-col cols="6" class="py-0 pr-1">
                  <v-text-field
                    v-model.number="searchParams.deviationUp"
                    label="Отклонение вверх, %"
                    type="number"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="py-0 pl-1">
                  <v-text-field
                    v-model.number="searchParams.deviationDown"
                    label="Отклонение вниз, %"
                    type="number"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Температура/Высота -->
              <v-row dense class="mt-0">
                <v-col cols="6" class="py-0 pr-1">
                  <v-text-field
                    v-model.number="searchParams.temperature"
                    label="Температура, °С"
                    type="number"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="py-0 pl-1">
                  <v-text-field
                    v-model.number="searchParams.altitude"
                    label="Высота над уровнем моря, м"
                    type="number"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Минимальная частота/Максимальная частота -->
              <v-row dense class="mt-0">
                <v-col cols="6" class="py-0 pr-1">
                  <v-text-field
                    v-model.number="searchParams.minFrequency"
                    label="Минимальная частота, Гц"
                    type="number"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="py-0 pl-1">
                  <v-text-field
                    v-model.number="searchParams.maxFrequency"
                    label="Максимальная частота, Гц"
                    type="number"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Исполнение/Климатическое исполнение -->
              <v-row dense class="mt-0">
                <v-col cols="6" class="py-0 pr-1">
                  <v-select
                    v-model="searchParams.execution"
                    :items="executionTypes"
                    label="Исполнение"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-select>
                </v-col>
                <v-col cols="6" class="py-0 pl-1">
                  <v-select
                    v-model="searchParams.climate"
                    :items="climateTypes"
                    label="Климатическое исполнение"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-select>
                </v-col>
              </v-row>

              <!-- Положение корпуса/Резерв мощности -->
              <v-row dense class="mt-0">
                <v-col cols="6" class="py-0 pr-1">
                  <v-select
                    v-model="searchParams.bodyPosition"
                    :items="bodyPositions"
                    label="Положение корпуса"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-select>
                </v-col>
                <v-col cols="6" class="py-0 pl-1">
                  <v-text-field
                    v-model.number="searchParams.powerReserve"
                    label="Резерв мощности, %"
                    type="number"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Тип запуска/Тип расчета/Исполнение 5 -->
              <v-row dense class="mt-0">
                <v-col cols="4" class="py-0 pr-1">
                  <v-select
                    v-model="searchParams.startType"
                    :items="startTypes"
                    label="Тип запуска"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-select>
                </v-col>
                <v-col cols="4" class="py-0 px-1">
                  <v-select
                    v-model="searchParams.calculationType"
                    :items="calculationTypes"
                    label="Тип расчета"
                    outlined
                    dense
                    hide-details
                    class="compact-input"
                  ></v-select>
                </v-col>
                <v-col cols="4" class="py-0 pl-1">
                  <v-checkbox
                    v-model="searchParams.execution5"
                    label="Исполнение 5"
                    dense
                    hide-details
                    class="compact-checkbox mt-1"
                  ></v-checkbox>
                </v-col>
              </v-row>

              <!-- Примечание -->
              <v-row dense class="mt-0">
                <v-col cols="12" class="py-0">
                  <v-textarea
                    v-model="searchParams.notes"
                    label="Примечание"
                    outlined
                    dense
                    hide-details
                    rows="2"
                    class="compact-textarea"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-btn
                color="primary"
                type="submit"
                block
                class="mt-1"
                :loading="isLoading"
                small
              >
                Подобрать
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Правая часть - результаты и детали -->
      <v-col cols="12" md="5" class="pl-1">
        <v-row class="fill-height" style="min-height: calc(100vh - 160px)">
          <!-- Результаты поиска -->
          <v-col cols="12" class="pb-1">
            <v-card class="h-100" elevation="2" style="overflow-y: auto">
              <v-card-title class="text-h6 pa-">Результаты ({{ searchResults.length }})</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-0">
                <v-list dense class="overflow-y-auto" style="max-height: calc(50vh - 120px)">
                  <v-list-item
                    v-for="(fan, index) in searchResults"
                    :key="index"
                    @click="selectFan(fan)"
                    :class="{ 'blue lighten-5': selectedFan && selectedFan.id === fan.id }"
                    class="px-2"
                  >
                    <v-list-item-content class="py-1">
                      <v-list-item-title class="text-body-2">{{ fan.model }}</v-list-item-title>
                      <v-list-item-subtitle class="text-caption">
                        {{ fan.flowRate }} м³/ч | {{ fan.pressure }} Па
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action class="my-0">
                      <v-chip x-small>{{ fan.efficiency }}%</v-chip>
                    </v-list-item-action>
                  </v-list-item>
                  
                  <v-list-item v-if="searchResults.length === 0" class="px-2">
                    <v-list-item-content class="py-1">
                      <v-list-item-title class="text--secondary text-body-2">
                        Нет результатов
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          
          <!-- Детали вентилятора -->
          <v-col cols="12" class="pt-1">
            <v-card class="h-100" elevation="2" style="overflow-y: auto">
              <v-card-title class="text-h6 pa-2">
                {{ selectedFan ? selectedFan.model : 'Характеристики' }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-1" style="max-height: calc(50vh - 120px)">
                <template v-if="selectedFan">
                  <v-simple-table dense class="compact-table">
                    <template v-slot:default>
                      <tbody>
                        <tr v-for="(value, key) in fanCharacteristics" :key="key">
                          <td class="py-1 px-1"><strong class="text-caption">{{ value.label }}</strong></td>
                          <td class="py-1 px-1 text-caption">{{ selectedFan[key] || '-' }} {{ value.unit }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  
                  <v-btn
                    color="primary"
                    block
                    class="mt-1"
                    :disabled="!selectedFan"
                    small
                  >
                    Добавить в проект
                  </v-btn>
                </template>
                <template v-else>
                  <div class="text--secondary text-center py-2 text-caption">
                    Выберите вентилятор для просмотра характеристик
                  </div>
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      searchParams: {
        system: '',
        fanType: null,
        series: null,
        execution: null,
        climate: null,
        bodyPosition: null,
        flowRate: null,
        pressure: null,
        deviationUp: 10,
        deviationDown: 10,
        powerReserve: 15,
        temperature: 20,
        altitude: 0,
        calculationType: 'standard',
        minFrequency: 30,
        maxFrequency: 50,
        quantity: 1,
        startType: 'direct',
        execution5: false,
        notes: ''
      },
      searchResults: [],
      selectedFan: null,
      fanTypes: ['Осевой', 'Радиальный', 'Канальный', 'Крышной'],
      seriesByType: {
        'Осевой': ['Серия A', 'Серия B', 'Серия C'],
        'Радиальный': ['Серия R', 'Серия S', 'Серия T'],
        'Канальный': ['Серия D', 'Серия E'],
        'Крышной': ['Серия ROOF-1', 'Серия ROOF-2']
      },
      executionTypes: ['Исполнение 1', 'Исполнение 2', 'Исполнение 3'],
      climateTypes: ['УХЛ', 'Т', 'ОМ', 'В'],
      bodyPositions: ['Горизонтальное', 'Вертикальное', 'Наклонное'],
      calculationTypes: ['Стандартный', 'Оптимальный', 'Энергосберегающий'],
      startTypes: ['Прямой', 'Плавный', 'Частотный'],
      filteredSeries: [],
      fanCharacteristics: {
        model: { label: 'Модель', unit: '' },
        series: { label: 'Серия', unit: '' },
        flowRate: { label: 'Расход', unit: 'м³/ч' },
        pressure: { label: 'Давление', unit: 'Па' },
        power: { label: 'Мощность', unit: 'кВт' },
        efficiency: { label: 'КПД', unit: '%' },
        frequency: { label: 'Частота', unit: 'Гц' },
        material: { label: 'Материал', unit: '' },
        dimensions: { label: 'Габариты', unit: 'мм' },
        weight: { label: 'Вес', unit: 'кг' }
      }
    }
  },
  methods: {
    updateSeries() {
      this.filteredSeries = this.seriesByType[this.searchParams.fanType] || [];
      this.searchParams.series = null;
    },
    async searchFans() {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.searchResults = [
          {
            id: 1,
            model: 'ВО 06-300',
            series: 'Серия A',
            flowRate: 1250,
            pressure: 320,
            power: 1.5,
            efficiency: 78,
            frequency: 50,
            material: 'Сталь',
            dimensions: '500x600x400',
            weight: 45
          },
          {
            id: 2,
            model: 'ВР 80-75',
            series: 'Серия R',
            flowRate: 1100,
            pressure: 350,
            power: 1.8,
            efficiency: 75,
            frequency: 50,
            material: 'Сталь оцинкованная',
            dimensions: '600x700x500',
            weight: 68
          }
        ];
        
        if (this.searchResults.length > 0) {
          this.selectedFan = this.searchResults[0];
        }
      } catch (error) {
        console.error('Ошибка поиска:', error);
      } finally {
        this.isLoading = false;
      }
    },
    selectFan(fan) {
      this.selectedFan = fan;
    }
  }
}
</script>

<style scoped>
.h-100 {
  height: 100%;
}

/* Компактные стили */
.compact-form {
  /* max-width: 500px; */
  margin: 0 auto;
}

.compact-input {
  /* max-width: 150px; */
  margin: 2px auto;
  padding:  3px;
  
}

.compact-checkbox {
  /* max-width: 120px; */
  margin: 2px auto;
}

.compact-textarea {
  margin-top: 4px;
}

.compact-table {
  font-size: 0.75rem;
}

.v-card {
  border-radius: 4px;
}

.v-card-title {
  padding: 8px 12px;
}

.v-card-text {
  padding: 8px;
}

.v-text-field--outlined >>> fieldset {
  border-width: 1px !important;
}

.v-input--checkbox {
  margin: 0;
}

.v-col {
  padding-top: 0;
  padding-bottom: 0;
}

.v-list-item {
  min-height: 36px;
}

.v-chip {
  font-size: 0.65rem;
  height: 18px;
}
</style>