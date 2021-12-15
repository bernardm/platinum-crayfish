<template>
  <div>
      <h2>DeckList Component</h2>
      <table>
        <thead>
          <th>ID</th>
          <th>Deck name</th>
        </thead>
        <tbody>
          <tr v-for="deck in decks" v-bind:key="deck.id">
            <td>{{ deck.id }}</td>
            <td>{{ deck.name }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      decks: [
        {
          id: 1,
          name: 'Deck one'
        },
         {
          id: 2,
          name: 'Deck two'
        }
      ]
    }
  }
}
</script>

<style>

</style>
