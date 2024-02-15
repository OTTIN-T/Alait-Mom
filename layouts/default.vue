<template>
  <NavHeader />
  <main class="min-h-dvh">
    <slot name="body" />

    <CookieControl locale="fr" />
  </main>
  <LazyNavFooter />
</template>

<script lang="ts" setup>
</script>

<style lang="css" scoped>
@media (max-width: 425px) {
  :deep(.cookieControl__Bar) {
    width: 80vw !important;
  }
}

@media (min-width: 426px) {
  :deep(.cookieControl__Bar) {
    width: 60vw !important;
  }
}

:deep(.cookieControl__Bar) {
  margin: auto auto 1% auto;
  border-radius: 0.375rem !important;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2) !important;
  background-color: #0F172A;

  .cookieControl__BarContainer {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      padding-right: 15px;
    }
  }

  .cookieControl__BarButtons {
    margin-top: 1.25rem;

    button {
      border-radius: 0.375rem !important;
      padding: 10px;
      font-size: 15px;
      background-color: #9C4EE6;
      color: white;

      &:nth-child(1) {
        background-color: #15803D;
      }

      &:nth-child(3) {
        background-color: #8558ED;
      }
    }
  }
}

:deep(.cookieControl__ControlButton) {
  background-color: #9C4EE6;

  svg {
    color: white;
  }
}

:deep(.cookieControl__ModalContent) {
  border-radius: 0.375rem !important;

  .cookieControl__ModalContentInner {

    button.cookieControl__ModalClose {
      border-radius: 0.375rem !important;
      padding: 10px;
      font-size: 15px;
      background-color: #B91C1C;
    }

    .cookieControl__ModalInputWrapper>button {
      background-color: #15803D !important;
    }
  }

  .cookieControl__ModalButtons {
    button {
      border-radius: 0.375rem !important;
      padding: 10px;
      font-size: 15px;
      background-color: #9C4EE6;

      &:nth-child(2) {
        background-color: #15803D;
      }

      &:nth-child(3) {
        background-color: #B91C1C;
      }
    }
  }
}
</style>
