/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react"
import { useSafeDispatch } from "./useSafeDispatch"

export enum Status {
  IDLE = "idle",
  PENDING = "pending",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

interface FiniteState<
  Status extends "idle" | "pending" | "resolved" | "rejected",
  Data extends unknown = null,
  Err extends null | Error = null
> {
  status: Status
  data: Data
  error: Err
}

export type State<Data> =
  | FiniteState<"idle">
  | FiniteState<"pending">
  | FiniteState<"resolved", Data>
  | FiniteState<"rejected", null, Error>

interface ActionType<
  Type extends "idle" | "pending" | "resolved" | "rejected"
> {
  type: Type
}

interface ActionIdle extends ActionType<Status.IDLE> {}
interface ActionPending extends ActionType<Status.PENDING> {}

interface ActionResolved<Data> extends ActionType<Status.RESOLVED> {
  data: Data
}

interface ActionRejected extends ActionType<Status.REJECTED> {
  error: Error
}

type Action<Data> =
  | ActionIdle
  | ActionPending
  | ActionResolved<Data>
  | ActionRejected

type AsyncReducer<Data> = React.Reducer<State<Data>, Action<Data>>
function asyncReducer<Data>(
  state: State<Data>,
  action: Action<Data>
): State<Data> {
  switch (action.type) {
    case Status.IDLE:
      return {
        status: Status.IDLE,
        data: null,
        error: null,
      }

    case Status.PENDING:
      return {
        status: Status.PENDING,
        data: null,
        error: null,
      }

    case Status.RESOLVED:
      return {
        status: Status.RESOLVED,
        data: action.data,
        error: null,
      }

    case Status.REJECTED:
      return {
        status: Status.REJECTED,
        data: null,
        error: action.error,
      }

    default: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: exhaustive fallthrough checks: Property 'type' does not exist on type 'never'.
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const useAsync = <Data,>(
  initialState: State<Data> = { status: Status.IDLE, data: null, error: null }
): {
  state: State<Data>
  run: (promise: Promise<Data>) => void
  setError: (error: Error) => void
  status: Status
  isIdle: boolean
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  setData: (data: Data) => void
  reset: () => void
  error: (Error & { statusCode?: number }) | null
} => {
  const initialStateRef = React.useRef({
    // @ts-expect-error: 'status' is specified more than once, so this usage will be overwritten.
    status: Status.IDLE,
    ...initialState,
  })

  const [state, dispatch] = React.useReducer<AsyncReducer<Data>>(
    asyncReducer,
    initialStateRef.current
  )
  const safeSetState = useSafeDispatch(dispatch)

  const setError = React.useCallback(
    (error: Error) => safeSetState({ error, type: Status.REJECTED }),
    [safeSetState]
  )
  const setData = React.useCallback(
    (data: Data) => safeSetState({ data, type: Status.RESOLVED }),
    [safeSetState]
  )

  const reset = React.useCallback(
    () =>
      safeSetState({
        type: Status.IDLE,
        data: null,
        error: null,
      } as Action<Data>),
    [safeSetState]
  )

  const run = React.useCallback(
    (promise: Promise<Data>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        )
      }
      safeSetState({ type: Status.PENDING })
      return promise.then(
        (data: Data) => {
          setData(data)
          return data
        },
        (error: Error) => {
          setError(error)
          return Promise.reject(error)
        }
      )
    },
    [safeSetState, setData, setError]
  )

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "pending",
    isError: state.status === "rejected",
    isSuccess: state.status === "resolved",
    status: state.status as Status,
    state,
    error: state.error,
    run,
    setError,
    reset,
    setData,
  }
}
