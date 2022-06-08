<template>
  <div class="container-fluid" :class="{ empty: tableShow }">
    <div class="row">
      <div class="col-xs-12">
        <form action="" class="search">
          <input
            class="search__input"
            type="search"
            ref="search"
            placeholder="Ara"
            id="searchInput"
          />

          <div class="search__icon-container">
            <label for="searchInput" class="search__label" aria-label="Search">
              <svg viewBox="0 0 1000 1000" title="Ara">
                <path
                  fill="currentColor"
                  d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
                />
              </svg>
            </label>

            <button
              class="search__submit"
              aria-label="Search"
              @click.prevent="searchData"
            >
              <svg viewBox="0 0 1000 1000" title="Ara">
                <path
                  fill="currentColor"
                  d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row" id="resultTable" v-show="tableShow">
      <div class="col-xs-12">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import SearchService from "@/services/index";
// import { TabulatorFull as Tabulator } from "tabulator-tables";
// import "tabulator-tables/dist/css/tabulator_simple.min.css";

export default {
  data() {
    return {
      tableShow: false,
    };
  },
  methods: {
    searchData() {
      SearchService.query(this.$refs.search.value, "10", "0").then((data) => {
        this.$store.dispatch("search", this.$refs.search.value);
        this.$store.dispatch("data", data.hits.hits);
        this.$store.dispatch("countData",data.hits.total.value);
        this.tableShow = data.hits.hits.length > 0 ? true : false;
        
      });
    },
    responseData() {
      console.log(this.$store.getters.getCurrentSearch);
    },
  },
};
</script>
<style >
:root {
  --color-background: #222;
  --color-foreground: #ddd;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: Helvetica, sans-serif;
  font-weight: 100;
}

.container-fluid {
  align-items: center;
  background: var(--color-background);
  display: flex;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
}

.empty {
    justify-content: flex-start;
    padding-top: 3em;
}

.search {
  --easing: cubic-bezier(0.4, 0, 0.2, 1);
  --font-size: 2rem;
  --color: var(--color-foreground);
  --color-highlight: white;
  --transition-time-icon: 0.2s;
  --transition-time-input: 0.3s 0.25s;
  border-radius: 999px;
  border: 2px solid transparent;
  display: flex;
  transition: border-color var(--transition-time-icon) linear,
    padding var(--transition-time-input) var(--easing);
}
.search:not(:focus-within) {
  --transition-time-input: 0.2s 0s;
}
@media (prefers-reduced-motion: reduce) {
  .search {
    --transition-time-icon: 0s !important;
    --transition-time-input: 0s !important;
  }
}
.search__input {
  background: transparent;
  border: none;
  color: var(--color-highlight);
  font-size: var(--font-size);
  opacity: 0;
  outline: none;
  padding: 0;
  transition: width var(--transition-time-input) var(--easing),
    padding var(--transition-time-input) var(--easing),
    opacity var(--transition-time-input) linear;
  width: 0;
}
.search__input::-moz-placeholder {
  color: var(--color);
  opacity: 0.75;
}
.search__input:-ms-input-placeholder {
  color: var(--color);
  opacity: 0.75;
}
.search__input::placeholder {
  color: var(--color);
  opacity: 0.75;
}
.search__icon-container {
  height: calc(var(--font-size) + 2rem);
  position: relative;
  width: calc(var(--font-size) + 2rem);
}
.search__label,
.search__submit {
  color: var(--color);
  cursor: pointer;
  display: block;
  height: 100%;
  padding: 0;
  position: absolute;
  width: 100%;
}
.search__label:hover,
.search__label:focus,
.search__label:active,
.search__submit:hover,
.search__submit:focus,
.search__submit:active {
  color: var(--color-highlight);
}
.search__label {
  transition: transform var(--transition-time-icon) var(--easing), color 0.1s;
}
.search__submit {
  background: none;
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 0 4px inset transparent;
  display: none;
  outline: none;
  transition: color 0.1s, box-shadow 0.1s;
}
.search__submit svg {
  transform: scale(0.5);
}
.search__submit:focus {
  box-shadow: 0 0 0 4px inset var(--color-highlight);
}
.search:focus-within {
  border-color: var(--color);
}
.search:focus-within .search__input {
  opacity: 1;
  padding: 0 1rem 0 2rem;
  width: calc(var(--font-size) * 12);
}
.search:focus-within .search__label {
  transform: scale(0.5);
}
.search:focus-within .search__submit {
  -webkit-animation: unhide var(--transition-time-icon) steps(1, end);
  animation: unhide var(--transition-time-icon) steps(1, end);
  display: block;
}

.row {
  padding: 0 2rem;
}

#resultTable {
  width: 100%;
  margin-top: 3rem;
}

@-webkit-keyframes unhide {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: auto;
    opacity: 1;
  }
}

@keyframes unhide {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: auto;
    opacity: 1;
  }
}
</style>