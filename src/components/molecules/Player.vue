<script setup lang="ts">
import * as DiceItTypes from '../../diceit-types'

const props = defineProps<{
  game: DiceItTypes.Game
  player: DiceItTypes.Player
  role: DiceItTypes.CurrentPlayer
  myRole: DiceItTypes.CurrentPlayer
}>()

const isPlaying = computed(() => {
  return props.game.stage === DiceItTypes.Stage.Run && props.game.currentPlayer === props.role
})

const playerAddress = computed(() => {
  return props.role === DiceItTypes.CurrentPlayer.Owner ? props.game.owner : (props.role === DiceItTypes.CurrentPlayer.Challenger ? props.game.challenger : '')
})
</script>

<template>
  <div
    class="rounded-lg py-4 px-8"
    :class="{
      'text-left': props.role === DiceItTypes.CurrentPlayer.Owner,
      'text-right': props.role === DiceItTypes.CurrentPlayer.Challenger,
      'opacity-75': props.game.stage === DiceItTypes.Stage.Run && props.player.stop
    }"
  >
    <p v-if="props.myRole === role" class="font-bold mt-1">
      Me
    </p>
    <Popover v-else :pinned="role === DiceItTypes.CurrentPlayer.Challenger ? 'right' : undefined" :content="playerAddress">
      <p class="font-bold mt-1">
        <template v-if="role === DiceItTypes.CurrentPlayer.Owner">
          Owner
        </template>
        <template v-else-if="role === DiceItTypes.CurrentPlayer.Challenger">
          Challenger
        </template>
      </p>
    </Popover>
    <p class="flex mt-1 gap-2 items-center" :class="{'flex-row-reverse': role === DiceItTypes.CurrentPlayer.Challenger}">
      <carbon-meter-alt class="inline" /> {{ props.player.score }} / {{ props.game.maxScore }}
    </p>
    <p class="flex mt-1 gap-2 items-center" :class="{'flex-row-reverse': role === DiceItTypes.CurrentPlayer.Challenger}">
      <carbon-direction-u-turn class="inline" /> {{ props.player.turn }} / {{ props.game.maxTurn }}
    </p>
    <p
      v-if="props.game.stage === DiceItTypes.Stage.Run"
      class="flex mt-1 gap-2 items-center"
      :class="{'flex-row-reverse': role === DiceItTypes.CurrentPlayer.Challenger, 'text-green-500': isPlaying, 'animate-pulse': !isPlaying && !props.player.stop}"
    >
      <carbon-circle-dash
        v-if="!props.player.stop"
        class="inline"
        :class="{'text-green-500 animate-spin': isPlaying}"
      /><carbon-stop-filled v-else class="inline" />
      <template v-if="props.player.stop">
        Stopped
      </template>
      <template v-else-if="isPlaying">
        Playing
      </template>
      <template v-else>
        Waiting
      </template>
    </p>
    <p v-else class="opacity-0">
      Waiting
    </p>
  </div>
</template>
